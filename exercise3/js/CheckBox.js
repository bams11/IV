export default function createCheckbox(location, checkboxContainer) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "location";
  checkbox.value = location.location;
  checkbox.checked = false; // 기본적으로 모두 선택된 상태로 시작

  const label = document.createElement("label");
  label.textContent = location.location;

  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(label);

  checkboxContainer.appendChild(checkboxWrapper);
}
