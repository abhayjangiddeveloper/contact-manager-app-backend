const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @desc Get all contacts
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const { name, phone, sort, page, limit } = req.query;

  // QUERY OBJECT
  const queryObject = {
    user_id: req.user.id,
  };

  // NAME SEARCH
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // MOBILE NUMBER SEARCH
  if (phone) {
    queryObject.phone = { $regex: phone, $options: "i" };
  }

  let url = Contact.find(queryObject);

  // SORTING
  if (sort) {
    let fixSort = sort.replace(",", " ");
    url = url.sort(fixSort);
  }

  // PAGINATION
  if (page || limit) {
    const pages = Number(page) || 1;
    const limits = Number(limit) || 10;
    const skips = (pages - 1) * limits;

    url = url.skip(skips).limit(limits);
    const contacts = await url;
    res
      .status(200)
      .json({ page: pages, count: contacts.length, results: contacts });
  }

  const contacts = await url;
  res.status(200).json(contacts);
});

// @desc create New contact
// @route POST /api/contacts
// @access private
const createContacts = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const create = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(create);
});

// @desc Get Single contacts
// @route GET /api/contacts/:id
// @access private
const getSingleContacts = asyncHandler(async (req, res) => {
  const SingleContacts = await Contact.findById(req.params.id);

  if (!SingleContacts) {
    res.status(404);
    throw new Error("No Contact Found");
  }
  res.status(200).json(SingleContacts);
});

// @desc update a contacts
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const SingleContacts = await Contact.findById(req.params.id);

  if (!SingleContacts) {
    res.status(404);
    throw new Error("No Contact Found");
  }

  if (SingleContacts.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't permission to update other user contacts");
  }

  const contactUpdate = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(contactUpdate);
});

// @desc Delete a contacts
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const SingleContacts = await Contact.findById(req.params.id);

  if (!SingleContacts) {
    res.status(404);
    throw new Error("No Contact Found");
  }

  if (SingleContacts.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't permission to delete other user contacts");
  }

  const contactDelete = await Contact.deleteOne(SingleContacts);
  res.status(200).json(contactDelete);
});

module.exports = {
  getContacts,
  createContacts,
  getSingleContacts,
  updateContact,
  deleteContact,
};