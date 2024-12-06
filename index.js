const contacts = [
  {
    id: 1,
    name: "Mutiara Nofitasari",
    email: "mutiara@aaa.com",
    phone: "+62 888-888-8888",
    address: "123 Main St, New York, NY 10001",
    status: "Approved",
    idFavorite: true,
    isDeleted: false,
    createdDate: "6/10/2024",
    deletedDate: null,
    labels: [2],
  },
  {
    id: 2,
    name: "Sahbana",
    email: "mutiara@aaa.com",
    phone: "+62 888-888-8888",
    address: "123 Main St, New York, NY 10001",
    status: "Approved",
    idFavorite: false,
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

contacts.forEach((contact) => {
  console.log(`ID: ${contact.id}`);
  console.log(`Fullname: ${contact.name}`);
  console.log(`Email: ${contact.email}`);
  console.log(`Phone: ${contact.phone}`);
  console.log(`Address: ${contact.address}`);
  console.log(`Status: ${contact.status}`);
  console.log(`Is Favorite: ${contact.idFavorite}`);
  console.log(`Is Deleted: ${contact.isDeleted}`);
  console.log(`Created Date: ${contact.createdDate}`);
  console.log(`Deleted Date: ${contact.deletedDate}`);
  console.log(
    `Labels: ${contact.labels
      .map((label) => labels.find((l) => l.labelId === label).labelName)
      .join(", ")}`
  );
  console.log("----------------------------------------");
});
