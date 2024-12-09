const contacts = [
  {
    id: 1,
    name: "Mutiara Nofitasari",
    email: "mutiara@aaa.com",
    phone: "+62 888-888-8888",
    address: "123 Main St, New York, NY 10001",
    isFavorite: true,
    isDeleted: false,
    createdDate: "6/10/2024",
    deletedDate: null,
    labels: [2],
  },
  {
    id: 2,
    name: "Sahbana",
    email: "bana@aaa.com",
    phone: "+62 888-888-8889",
    address: "123 Main St, New York, NY 10001",
    isFavorite: false,
    isDeleted: false,
    createdDate: "6/10/2024",
    deletedDate: null,
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
    labelName: "Friends",
    color: "#00C853",
  },
];

function getContactList() {
  contacts.forEach((contact) => {
    console.log(`
    ID            : ${contact.id}
    Fullname      : ${contact.name}
    Email         : ${contact.email}
    Phone         : ${contact.phone}
    Address       : ${contact.address}
    Favorite      : ${contact.isFavorite ? "yes" : "no"}
    Created Date  : ${contact.createdDate}
    Labels        : ${contact.labels
      .map(
        (label) => labels.find((element) => element.labelId === label).labelName
      )
      .join(", ")}
  `);
  });
}

function getContactsDetail() {
  if (contacts.length === 0) {
    console.log("Contact List is empty");
    return "";
  }

  console.log("Contact List:");
  let contactList = contacts.map((element, index) => {
    const { name, phone, email, address } = element;

    return `${index + 1}. ${name} (${phone}) ${email} in ${address}`;
  });

  return contactList.join("\n");
}

const contactsDetail = getContactsDetail();

console.log(contactsDetail);
console.log(getcontactList());
