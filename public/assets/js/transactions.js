const uploadBalance = document.getElementById('uploadBalance');
uploadBalance.addEventListener('click', (e) => {
    let balance = 0
    let internalNumber = document.getElementById('internalNumber').value;

    fetch('/balances/force/' + internalNumber, {method: 'GET'})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong.');
        })
        .then(result => {
            balance = _.isEmpty(result.results.data) ? 0 : result.results.data[0].balance;
            document.getElementById('balance').innerHTML = balance.toFixed(2).toLocaleString();
            alert(result.results.message);
        })
        .catch(err => {
            alert(err.message)
        });
});

function getTransaction() {
    let externalNumber = document.getElementById('search').value
    window.location.href = "/transactions/" + externalNumber;
}

function search(ele) {
    if(event.key === 'Enter') {
        getTransaction();
    }
}