// PALITAN ITO DIPENDE SA KUNG SINO ANG NAKA-LOGIN:
// Kay Ellaine:
const currentUser = {
  name: "EJC_Devnet",
  fullName: "Ellaine",
  role: "District Branch Manager",
};

// Kay Arvin (i-uncomment para subukan):
// const currentUser = { name: "APRISNO", fullName: "Arvin", role: "Logistics" };

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("user-fullname").textContent =
    `${currentUser.fullName} (${currentUser.name})`;
  document.getElementById("user-role").textContent = `(${currentUser.role})`;
  document.getElementById("header-user-name").textContent = currentUser.name;
  document.getElementById("user-avatar").textContent =
    currentUser.fullName.charAt(0);

  const navContainer = document.getElementById("dynamic-nav");

  if (currentUser.role === "District Branch Manager") {
    // Menu ni Ellaine
    navContainer.innerHTML = `
      <div class="px-3 py-1 font-bold text-blue-300/60 uppercase tracking-wider text-[10px] mb-2">SALES SUMMARY</div>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Sales</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Forecast</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Delivery</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Pullout</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Actual Pullout</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Adjustment</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Forecast Collection</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Actual Collection</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Regional Database</a>
    `;
  } else if (currentUser.role === "Logistics") {
    // Menu ni Arvin
    navContainer.innerHTML = `
      <div class="px-3 py-1 font-bold text-blue-300/60 uppercase tracking-wider text-[10px] mb-2">NATIONAL</div>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Sales</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Forecast</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Warehouse</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Picklist</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Packing</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Delivery</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">National Database</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Pullout</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Actual Pullout</a>
      <a href="#" class="block px-3 py-2.5 rounded-lg hover:bg-blue-900/50 transition">Adjustment</a>
    `;
  }
});
