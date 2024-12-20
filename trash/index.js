const tableBodyElement = document.getElementById("table-body");
const emptyTrashButtonElement = document.getElementById("empty-trash-button");
const trashContainerElement = document.getElementById("trash-container");
const emptyContactElement = document.getElementById("empty-contact-card");
const contactTableElement = document.getElementById("contact-table");

function renderContacts() {
  const dataContacts = loadContacts();

  const contacts = dataContacts
    .filter((contact) => contact.isDeleted)
    .reverse();

  if (contacts.length === 0) {
    emptyContactElement.classList.remove("hidden");
    contactTableElement.classList.add("hidden");
    trashContainerElement.classList.add("hidden");
    return;
  }

  emptyContactElement.classList.add("hidden");
  contactTableElement.classList.remove("hidden");
  trashContainerElement.classList.remove("hidden");
  renderTableBody(contacts);
}

function renderTableBody(contacts) {
  const labels = loadLabels();

  tableBodyElement.innerHTML = "";
  tableBodyElement.innerHTML = contacts
    .map((contact) => {
      const { id, name, email, phone, address, isFavorited } = contact;

      return `
        <tr id="table-row-${id}" class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3">
            <div class="flex items-center text-sm">
              <!-- Avatar with inset shadow -->
              <div
                class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
              >
                <img
                  src="https://ui-avatars.com/api/?background=random&name=
                    ${name}
                  &size=200"
                  class="inline-flex items-center justify-center object-cover rounded-full mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl"
                  alt="user1"
                />
                <div
                  class="absolute inset-0 rounded-full shadow-inner"
                  aria-hidden="true"
                ></div>
              </div>
              <div>
                <p class="font-semibold">${name}</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">
                  ${isFavorited ? "♥" : ""}
                </p>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 text-sm">${email}</td>
          <td class="px-4 py-3 text-sm">${phone}</td>
          <td class="px-4 py-3 text-sm">${address}</td>
          <td class="px-4 py-3 text-sm">
            <div class="flex items-center space-x-4 text-sm">
               ${contact.labels
                 .map((label) => {
                   const currentLabel = labels.find(
                     (element) => element.id === label
                   );

                   return `
                    <span 
                      class="px-2 py-1 font-semibold leading-tight ${currentLabel.color}"
                    >
                      ${currentLabel.labelName}
                    </span>
                  `;
                 })
                 .join("")}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function showAlert(type, title, message) {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      emptyTrash();

      if (storedContacts.length < 1) window.location.href = "/";
    }
  });
}

function emptyTrash() {
  const storedContacts = loadContacts();
  const filteredContacts = storedContacts.filter(
    (contact) => !contact.isDeleted
  );

  saveContacts(filteredContacts);
  renderContacts();

  Swal.fire(
    "",
    "Trash is now empty. All contacts in the trash have been permanently deleted.",
    "success"
  );
  if (storedContacts.length < 1) window.location.href = "/";
}

window.addEventListener("load", renderContacts);

emptyTrashButtonElement.addEventListener("click", function () {
  showAlert(
    "warning",
    "Empty trash now?",
    "All contacts will be permanently deleted. This action cannot be undone. "
  );
});
