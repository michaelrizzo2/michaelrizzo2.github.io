const routes = {
  invoice: ['Billing · prepare a draft', 'Look up the invoice through an authorized billing integration, then prepare a reply for review. This demo does not access billing data.'],
  access: ['Account access · human review', 'Send the request to the support team. Identity verification and account changes require an authorized process.'],
  refund: ['Refund request · human review', 'Prepare the request context for a person to review against the refund policy. No payment action is performed.']
};
document.getElementById('run-workflow').addEventListener('click', () => {
  const [title, detail] = routes[document.getElementById('request-type').value];
  document.getElementById('route-title').textContent = title;
  document.getElementById('route-detail').textContent = detail;
});
