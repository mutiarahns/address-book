let dataContacts = [];
let labels = [];

// ===============================================
function loadAllData() {
  dataContacts = loadContacts();
  labels = loadLabels();

  if (dataContacts.length === 0) {
    console.log("No contacts found");
    return;
  }
}

function renderContacts() {
  loadAllData();

  if (dataContacts.length === 0) {
    console.log("No contacts found");
    return;
  }

  dataContacts.forEach((contact) => {
    const createdAt = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(contact.createdAt));

    const deletedAt = contact.deletedAt
      ? new Intl.DateTimeFormat("id-ID", {
          dateStyle: "long",
          timeStyle: "short",
          timeZone: "Asia/Jakarta",
        }).format(new Date(contact.deletedAt))
      : "N/A";

    console.log(`
      ID            : ${contact.id}
      Fullname      : ${contact.name}
      Email         : ${contact.email}
      Phone         : ${contact.phone}
      Address       : ${contact.address}
      Favorite      : ${contact.isFavorited ? "yes" : "no"}
      Created Date  : ${createdAt}
      Is Deleted    : ${contact.isDeleted ? "yes" : "no"}
      Deleted Date  : ${deletedAt}
      Labels        : ${contact.labels
        .map(
          (label) => labels.find((element) => element.id === label).labelName
        )
        .join(", ")}
    `);
  });
}

function searchContacts(contacts, searchTerm) {
  const searchedContacts = contacts.filter((contact) => {
    const terms = searchTerm.toLocaleLowerCase();
    const { name, email, phone, address } = contact;

    return (
      name.toLocaleLowerCase().includes(terms) ||
      email.toLocaleLowerCase().includes(terms) ||
      phone.toLocaleLowerCase().includes(terms) ||
      address.toLocaleLowerCase().includes(terms)
    );
  });

  if (searchedContacts.length === 0) {
    console.log("No contacts found");
  }

  return searchedContacts || [];
}

function generateId(contacts) {
  return contacts[contacts.length - 1].id + 1 || 0;
}

function addContact(contacts, newContactInput) {
  const newContact = {
    id: generateId(contacts),
    createdAt: new Date(),
    deletedAt: null,
    isDeleted: false,
    ...newContactInput,
  };

  const newContacts = [...contacts, newContact];

  saveContacts(newContacts);

  renderContacts();
}

function deleteContact(contacts, id) {
  const filteredContacts = contacts.filter((contact) => contact.id != id);

  saveContacts(filteredContacts);

  renderContacts();
}

function updateContact(contacts, id, newContactInput) {
  const originalContact = contacts.find((contact) => contact.id === id);
  const updatedContact = {
    ...originalContact,
    name: newContactInput.name || originalContact.name,
    email: newContactInput.email || originalContact.email,
    phone: newContactInput.phone || originalContact.phone,
    address: newContactInput.address || originalContact.address,
    deletedAt: newContactInput.deletedAt || originalContact.deletedAt,
    isDeleted: newContactInput.isDeleted,
    labels: newContactInput.labels || originalContact.labels,
  };
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === id) {
      return updatedContact;
    }
    return contact;
  });

  saveContacts(updatedContacts);

  renderContacts();
}

const getGithubUser = async () => {
  const response = await fetch("https://api.github.com/users");
  const data = await response.json();

  return data;
};

renderContacts();

getGithubUser().then((data) => {
  console.log(data);
});
