const detailContactContainerElement = document.getElementById(
  "detail-contact-container"
);

function getCurrentContactId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get("id");
}

function loadContactById(id) {
  const contacts = loadContacts();

  return contacts.find((contact) => contact.id == id);
}

function renderDetailContactForm() {
  const id = getCurrentContactId();
  const contact = loadContactById(id);

  if (!contact) {
    alert("Contact not found");
    return;
  }

  detailContactContainerElement.innerHTML = "";
  detailContactContainerElement.innerHTML = `
    <div class="flex items-baseline px-4 sm:px-0 space-x-2">
        <h3 class="text-base/7 font-semibold text-gray-900">
            Contact Detail
        </h3>
        <a
            href="/edit/?id=${id}"
            class="px-3 py-1.5 font-medium rounded-full text-sm/6 text-gray-900 bg-slate-300 hover:bg-slate-500 active:bg-slate-500 hover:text-white active:text-white transition-all duration-150 ease-in-out"
        >
            <i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>
            Edit
        </a>
        <button
            onClick="deleteContact(${id})"
            class="px-3 py-1.5 font-medium rounded-full text-sm/6 text-gray-900 bg-slate-300 hover:bg-slate-500 active:bg-slate-500 hover:text-white active:text-white transition-all duration-150 ease-in-out"
        >
            <i class="fa-solid fa-trash" aria-hidden="true"></i>
            Delete
        </button>
        </div>
        <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm/6 font-medium text-gray-900">Full name</dt>
            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                ${contact.name}
            </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm/6 font-medium text-gray-900">
                Email address
            </dt>
            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                ${contact.email}
            </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm/6 font-medium text-gray-900">
                Phone Number
            </dt>
            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                ${contact.phone}
            </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm/6 font-medium text-gray-900">Birthdate</dt>
            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                ${getDateFormat(new Date(contact.birthdate))}
            </dd>
            </div>
            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm/6 font-medium text-gray-900">Address</dt>
            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                ${contact.address}
            </dd>
            </div>

            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm/6 font-medium text-gray-900">Labels</dt>
            <dd class="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ul class="flex-wrap gap-2 flex text-sm">
                ${renderLabels(contact.labels || [])}
                ${
                  contact.isFavorited
                    ? `<li
                        class="text-xs px-2.5 py-1.5 bg-red-600 rounded-full border border-2 flex items-center justify-center font-bold text-white"
                    >
                        <i class="fa-solid fa-heart"></i>
                    </li>`
                    : ""
                }
                </ul>
            </dd>
            </div>
        </dl>
        </div>
    `;
}

function getDateFormat(fromDate) {
  if (!fromDate) {
    return "-";
  }

  const date = new Date(fromDate);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "Asia/Jakarta",
  }).format(date);

  return formattedDate ? formattedDate : "-";
}

function renderLabels(storedLabels) {
  const labels = loadLabels();

  if (!labels || labels.length === 0) {
    return "";
  }

  return storedLabels
    .map((label) => {
      const currentLabel = labels.find((element) => element.id === label);

      return currentLabel
        ? `
        <li
          class="text-xs px-10 py-2 bg-slate-200 rounded-full border border-2 flex items-center justify-center font-semibold text-slate-900"
        >
          ${currentLabel.labelName}
        </li>
        `
        : "";
    })
    .join("");
}

function deleteContact(id) {
  const contacts = loadContacts();
  const filteredContacts = contacts.filter((contact) => contact.id != id);

  saveContacts(filteredContacts);

  window.location.href = "/";
}

window.addEventListener("load", renderDetailContactForm);
