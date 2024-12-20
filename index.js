const tableBodyElement = document.getElementById("table-body");
const searchInputElement = document.getElementById("search-input");
const emptyContactElement = document.getElementById("empty-contact-card");
const tableDataElement = document.getElementById("table-data");
const labelListElement = document.getElementById("label-list");

let dataContacts = [];
let labels = [];
let pageNumber = 0;

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

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const selectedLabel = urlParams.get("label");

  let contacts = dataContacts.filter((contact) => !contact.isDeleted).reverse();

  if (selectedLabel) {
    contacts = contacts.filter((contact) =>
      contact.labels.includes(parseInt(selectedLabel))
    );
  }

  if (contacts.length === 0) {
    emptyContactElement.classList.remove("hidden");
    tableDataElement.classList.add("hidden");
    return;
  }

  renderTableBody(contacts);
  renderPagination(contacts);
}

function renderTableBody(contacts) {
  const filteredContacts = contacts.filter((contact) => !contact.isDeleted);

  tableBodyElement.innerHTML = "";
  tableBodyElement.innerHTML = filteredContacts
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
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <button
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              aria-label="Edit"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                ></path>
              </svg>
            </button>
            <button
              href="javascript:;"
              @click="deleteContactById(${contact.id})"
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
              aria-label="Delete"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
}

function renderPagination(contacts) {
  const paginationElement = document.getElementById("contact-pagination");
  const paginationInfoElement = document.getElementById(
    "contact-pagination-info"
  );
  const totalPage = Math.ceil(contacts.length / 10);

  emptyContactElement.classList.add("hidden");
  tableDataElement.classList.remove("hidden");

  paginationInfoElement.innerHTML = "";
  paginationInfoElement.innerHTML = `
  Showing ${pageNumber * contacts.length + 1} - ${
    (pageNumber + 1) * contacts.length
  } of ${dataContacts.length}`;

  paginationElement.innerHTML = "";
  paginationElement.innerHTML = `
    <button
      ${pageNumber === 0 ? "disabled" : ""}
      onclick="changePage(${pageNumber - 1})"
      class="${
        pageNumber === 0
          ? "px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple opacity-50 cursor-not-allowed focus:outline-none"
          : "px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
      }"
      aria-label="Previous"
    >
      <svg
        aria-hidden="true"
        class="w-4 h-4 fill-current"
        viewBox="0 0 20 20"
      >
        <path
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
    </button>

    <div class="flex items-center justify-center px-3">
      <p class="text-slate-600">
        Page
        <strong class="text-slate-800">${
          pageNumber + 1
        }</strong> of&nbsp;<strong
          class="text-slate-800"
          >${totalPage}</strong
        >
      </p>
    </div>

    <button
      ${pageNumber === totalPage - 1 ? "disabled" : ""}
      onclick="changePage(${pageNumber + 1})" 
      class="${
        pageNumber === totalPage - 1
          ? "px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple opacity-50 cursor-not-allowed focus:outline-none"
          : "px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
      }"
      aria-label="Next"
    >
      <svg
        class="w-4 h-4 fill-current"
        aria-hidden="true"
        viewBox="0 0 20 20"
      >
        <path
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
          fill-rule="evenodd"
        ></path>
      </svg>
    </button>
  `;
}

function renderLables() {
  const labels = loadLabels();

  labelListElement.innerHTML = "";
  labelListElement.innerHTML = labels
    .map(
      (label) => `
  <li
    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
  >
    <a class="w-full" href="/?label=${label.id}">Family</a>
  </li>
  `
    )
    .join("");
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

function deleteContact(contacts, id) {
  const filteredContacts = contacts.filter((contact) => contact.id != id);

  saveContacts(filteredContacts);

  renderContacts();
}

function deleteContactById(id) {
  const originalContact = dataContacts.find((contact) => contact.id === id);

  if (!originalContact) {
    return;
  }

  showAlert(
    "warning",
    `Are you sure you want to delete ${originalContact.name}?`,
    `Deleted contact will be moved to Trash and deleted forever if you empty the Trash.`,
    dataContacts,
    originalContact
  );
}

function showAlert(type, title, message, storedContacts, deletedContact) {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    showCancelButton: true,
    confirmButtonText: "Yes",
  }).then((result) => {
    if (result.isConfirmed) {
      updateContact(storedContacts, deletedContact.id, {
        deletedAt: new Date(),
        isDeleted: true,
      });
      Swal.fire(
        "",
        `${deletedContact.name} has been deleted successfully`,
        "success"
      );
      if (storedContacts.length < 1) window.location.href = "/";
    }
  });
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

window.addEventListener("load", function () {
  renderContacts();
});
