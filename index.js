const contactListElement = document.getElementById("contact-list");
const searchFormElement = document.getElementById("search-form");
const labelListElement = document.getElementById("label-list");

const fromElement = document.getElementById("formElm");

function renderHomePage() {
  let contacts = loadContacts().reverse();
  const querString = window.location.search;
  const urlParams = new URLSearchParams(querString);
  const selectedLabel = urlParams.get("label");
  const favorite = urlParams.get("favorite");
  const searchQuery = urlParams.get("q");
  const mockData = urlParams.get("mock");
  const searchInput = document.getElementById("search-input");

  searchInput.value = searchQuery;

  renderLabelCategory(selectedLabel, favorite);

  if (mockData) {
    let reversedContacts = [...mockDataContacts].reverse();
    saveContacts([...mockDataContacts]);
    contacts = [...reversedContacts];

    window.location.href = "/";
    return;
  }

  contacts = searchQuery ? searchContacts(contacts, searchQuery) : contacts;
  contacts = favorite
    ? contacts.filter((contact) => contact.isFavorited)
    : contacts;
  contacts = selectedLabel
    ? contacts.filter((contact) =>
        contact.labels.includes(parseInt(selectedLabel))
      )
    : contacts;

  if (contacts.length === 0) {
    renderEmptyContact();
    return;
  }

  renderContactList(contacts);
}

function renderContactList(contacts) {
  const labels = loadLabels();

  contactListElement.innerHTML = "";
  contactListElement.innerHTML = contacts
    .map((contact) => {
      const avatarURL = `https://ui-avatars.com/api/?name=${contact.name}&size=200&font-size=0.15rem`;

      return `
      <div class="flex font-sans border border-2 rounded-md">
        <div class="flex-none w-48 relative">
          <img
            src="${avatarURL}"
            alt="${`${contact.name} Avatar`}"
            class="absolute rounded-md inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div class="flex-auto p-6">
          <div class="flex flex-wrap">
            <h1 class="flex-auto text-lg font-semibold text-slate-900">
              ${contact.name}
            </h1>

            <div class="space-x-2 flex text-sm">
              <button
                onClick="updateContact(${
                  contact.id
                }, { isFavorited: ${!contact.isFavorited} })"
                class="${
                  contact.isFavorited
                    ? "w-9 h-9 rounded-full flex items-center justify-center text-white bg-slate-900 text-lg"
                    : "w-9 h-9 rounded-full flex items-center justify-center text-white bg-slate-300 text-lg"
                }"
              >
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>

            <div
              class="w-full flex-none text-sm font-medium text-slate-700 mt-2"
            >
              ${contact.phone} -
              <span class="font-semibold">${contact.email}</span>
            </div>
            <div>
              <div class="text-sm font-semibold text-slate-500">
                🎂 ${getDateFormat(contact.birthdate || "")}
              </div>
              <div class="text-sm text-slate-700">
                ${contact.address}
              </div>
            </div>
          </div>

          <div class="text-sm font-semibold text-slate-700 mt-4">Tags:</div>

          <div
            class="flex items-baseline mt-1 mb-6 pb-6 border-b border-slate-200"
          >
            <ul class="flex-wrap gap-2 flex text-sm">
              ${
                !contact.labels || contact.labels.length === 0
                  ? "-"
                  : contact.labels
                      .map((label) => {
                        const currentLabel = labels.find(
                          (element) => element.id === label
                        );

                        return `
                  <li
                    class="text-xs px-3 py-2 bg-slate-200 rounded-full border border-2 flex items-center justify-center font-bold text-slate-900"
                  >
                    ${currentLabel.labelName}
                  </li>
                `;
                      })
                      .join("")
              }
            </ul>
          </div>

          <div class="flex space-x-4 mt-6 text-sm font-medium">
            <div class="flex-auto flex space-x-2">
              <a
                href="/detail/?id=${contact.id}"
                class="rounded-md bg-blue-500 py-2 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-500/90 focus:shadow-none active:bg-blue-500/90 hover:bg-blue-500/90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <i class="fa-regular fa-eye w-4 h-4" aria-hidden="true"></i>
                Detail
              </a>
              <a
                href="/edit/?id=${contact.id}"
                class="rounded-md bg-slate-900 py-2 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-900/90 focus:shadow-none active:bg-slate-900/90 hover:bg-slate-900/90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <i
                  class="fa-regular fa-pen-to-square w-4 h-4"
                  aria-hidden="true"
                ></i>
                Edit
              </a>
              <button
                onClick="deleteContact(${contact.id})"
                class="rounded-md bg-[#ea4335] py-2 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-[#ea4335]/90 focus:shadow-none active:bg-[#ea4335]/90 hover:bg-[#ea4335]/90 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <i class="fa-solid fa-trash w-4 h-4" aria-hidden="true"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

function renderLabelCategory(selectedLabel, favorite) {
  const labels = loadLabels();

  labelListElement.innerHTML = "";

  labelListElement.innerHTML = labels
    .map((label) => {
      return `
      <li class="rounded-full flex items-center justify-center">
        <a
          href="/?label=${label.id}"
          class="${
            selectedLabel == label.id
              ? "px-10 py-2.5 font-medium rounded-full border-2 border-slate-200 flex items-center justify-center text-white text-sm bg-slate-900"
              : "px-10 py-2.5 font-medium rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-900 text-sm hover:font-medium hover:bg-slate-900 hover:text-white"
          }"
        >
          ${label.labelName}
        </a>
      </li>
      `;
    })
    .join("");

  labelListElement.innerHTML += `
      <li class="rounded-full flex items-center justify-center">
        <a
          href="/?favorite=true"
          class="${
            favorite
              ? "px-10 py-2.5 font-medium rounded-full border-2 border-slate-200 flex items-center justify-center text-white text-sm bg-slate-900"
              : "px-10 py-2.5 font-medium rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-900 text-sm hover:font-medium hover:bg-slate-900 hover:text-white"
          }"
        >
          🤎 Favorite
        </a>
      </li>
      `;
}

function renderEmptyContact() {
  contactListElement.classList.remove("xl:grid-cols-2");
  contactListElement.classList.add("xl:grid-cols-1");
  contactListElement.classList.remove("lg:grid-cols-2");
  contactListElement.classList.add("lg:grid-cols-1");

  contactListElement.innerHTML = "";
  contactListElement.innerHTML = `
  <li class="flex">
    <a href="/create" class="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
      <img src="assets/icon/empty-box.png" alt="icon-love">
      <p class="mt-5 text-lg font-semibold text-slate-900">No contacts found</p>
      <p class="mt-2 mb-5 text-sm font-medium text-slate-500">Create new contact to get started!</p>
    </a>
  </li>
  `;
}

function editContact(id) {
  window.location.href = `/edit?id=${id}`;
}

function updateContact(id, newContactInput, message = "") {
  const contacts = loadContacts();
  const originalContact = contacts.find((contact) => contact.id === id);
  const updatedContact = {
    ...originalContact,
    name: newContactInput.name || originalContact.name,
    email: newContactInput.email || originalContact.email,
    phone: newContactInput.phone || originalContact.phone,
    address: newContactInput.address || originalContact.address,
    isFavorited: newContactInput.isFavorited,
    labels: newContactInput.labels || originalContact.labels,
  };
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === id) {
      return updatedContact;
    }
    return contact;
  });

  saveContacts(updatedContacts);

  renderHomePage();
}

function searchContacts(contacts, searchInput) {
  return contacts.filter((contact) => {
    const terms = searchInput.toLocaleLowerCase();
    const { name, email, phone, address, birthdate } = contact;

    return (
      name.toLocaleLowerCase().includes(terms) ||
      email.toLocaleLowerCase().includes(terms) ||
      phone.toLocaleLowerCase().includes(terms) ||
      address.toLocaleLowerCase().includes(terms)
    );
  });
}

function deleteContact(id) {
  if (window.confirm("Do you really want to delete this contact?")) {
    const contacts = loadContacts();
    const filteredContacts = contacts.filter((contact) => contact.id != id);

    saveContacts(filteredContacts);

    showAlert("Contact has been deleted", renderHomePage);
  }
}

function showAlert(message, callback) {
  callback();
  alert(message);
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

window.addEventListener("load", function () {
  // reset labels
  saveLabels([]);

  renderHomePage();
});
