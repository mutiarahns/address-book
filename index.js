const contacts = [
  {
    id: 1,
    name: "Mutiara Nofitasari",
    email: "mutiara@aaa.com",
    phone: "+62 888-888-8888",
    address: "123 Main St, New York, NY 10001",
    isFavorited: true,
    isDeleted: false,
    createdAt: new Date().toLocaleDateString(),
    deletedAt: null,
    labels: [2],
  },
  {
    id: 2,
    name: "Sahbana",
    email: "bana@aaa.com",
    phone: "+62 888-888-8889",
    address: "123 Main St, New York, NY 10001",
    isFavorited: true,
    isDeleted: false,
    createdAt: new Date().toLocaleDateString(),
    deletedAt: null,
    labels: [1, 2],
  },
];

const labels = [
  {
    labelId: 1,
    labelName: "Work",
    color: "#00C853",
  },
  {
    labelId: 2,
    labelName: "Family",
    color: "#00C853",
  },
  {
    labelId: 3,
    labelName: "Friend",
    color: "#00C853",
  },
];

function getContacts() {
  return contacts
    .map((contact) => {
      return `
      ID            : ${contact.id}
      Fullname      : ${contact.name}
      Email         : ${contact.email}
      Phone         : ${contact.phone}
      Address       : ${contact.address}
      Favorite      : ${contact.isFavorited ? "yes" : "no"}
      Created Date  : ${contact.createdAt}
      Labels        : ${contact.labels
        .map(
          (label) =>
            labels.find((element) => element.labelId === label).labelName
        )
        .join(", ")}
      ======================================================
      `;
    })
    .join("\n");
}

function getFavoriteContacts() {
  return contacts.filter((contact) => contact.isFavorited);
}

function addContact(contact) {
  const id = contacts[contacts.length - 1].id + 1 || 0;

  contact.id = id;
  contacts.push(contact);

  return `Contact added with id ${id}: 
  ${contact.name}, ${contact.phone}, ${contact.email}, ${contact.address}`;
}

function deleteContact(id) {
  const index = contacts.findIndex((element) => element.id === id);

  if (index === -1) {
    return `Contact with id ${id} is not found in the list`;
  }

  contacts.splice(index, 1);
  return `Contact with id ${id} deleted`;
}

function searchContact(searchTerm) {
  return contacts.filter((contact) => {
    const terms = searchTerm.toLocaleLowerCase();
    const { name, email, phone, address } = contact;

    return (
      name.toLocaleLowerCase().includes(terms) ||
      email.includes(terms) ||
      phone.includes(terms) ||
      address.includes(terms)
    );
  });
}

function searchByLabel(terms) {
  return contacts.filter((contact) => {
    return contact.labels.includes(terms);
  });
}

function getContactDetails(id) {
  let contact = contacts.find((element) => element.id === id);

  if (!contact) {
    return `Contact with id ${id} is not found in the list`;
  }

  const { name, phone, email, address } = contact;

  return `Contact detail for id ${id}:
  ${name}, ${phone}, ${email}, ${address}`;
}

/*
 * Get contats
 */
const contactList = getContacts();

console.log("Contact list:");
console.log(contactList);

/*
 * Get contact details
 */
console.log(getContactDetails(1));
console.log(getContactDetails(3));

console.log("Search contacts:");
const filteredContacts = searchContact("mutiara");
console.log({ filteredContacts });

/*
 * Add new contact
 */
console.log("Add new contact:");
console.log(
  addContact({
    name: "Jhon Doe",
    email: "jhon@aaa.com",
    phone: "+62 888-888-8882",
    address: "123 Main St, New York, NY 10002",
    createdAt: new Date().toLocaleDateString(),
    labels: [3],
  })
);
console.log(
  addContact({
    name: "Jhon",
    email: "jhon@aaa.com",
    phone: "+62 888-888-8882",
    address: "123 Main St, New York, NY 10002",
    createdAt: new Date().toLocaleDateString(),
    labels: [1, 3],
  })
);
console.log("Contact list:");
console.log(getContacts());

/*
 * Delete contact
 */
console.log("Delete contact:");
console.log(deleteContact(3));
console.log(getContacts());

/*
 * Search by label
 */
console.log("Search by label:");
const family = searchByLabel(2);
const friend = searchByLabel(3);
const work = searchByLabel("work");

console.log({ family });
console.log({ friend });
console.log({ work });

/*
 * Get favorite contacts
 */
console.log("Favorite contacts:");
const favoriteContacts = getFavoriteContacts();
console.log({ favoriteContacts });
