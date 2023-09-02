var total = 0;

        document.getElementById("form").addEventListener("submit", function(event) {
            event.preventDefault();

            var nome = document.getElementById("nome").value;
            var preco = document.getElementById("preco").value;

            preco = preco.replace(/[^0-9,]/g, "");

            var table = document.getElementById("lista");
            var row = table.insertRow(-1);
            row.dataset.preco = preco;

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = nome;
            cell2.innerHTML = preco;
            cell3.innerHTML = "<button>X</button>";

            cell3.firstChild.addEventListener("click", function() {
                row.remove();
                total -= parseFloat(row.dataset.preco.replace(",", "."));
                document.getElementById("total").innerHTML = total.toFixed(2).replace(".", ",");
            });

            document.getElementById("nome").value = "";
            document.getElementById("preco").value = "";

            total += parseFloat(preco.replace(",", "."));
            document.getElementById("total").innerHTML = total.toFixed(2).replace(".", ",");
        });

        let checkboxes = document.querySelectorAll("#itens-predefinidos input[type=checkbox]");

        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener("change", function() {
                if (this.checked) {
                    var table = document.getElementById("lista");
                    var row = table.insertRow(-1);
                    row.dataset.preco = this.dataset.preco;

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);

                    cell1.innerHTML = this.dataset.item;
                    cell2.innerHTML = this.dataset.preco;
                    cell3.innerHTML = "<button>X</button>";

                    cell3.firstChild.addEventListener("click", function() {
                        row.remove();
                        total -= parseFloat(row.dataset.preco.replace(",", "."));
                        document.getElementById("total").innerHTML = total.toFixed(2).replace(".", ",");
                    });

                    total += parseFloat(this.dataset.preco.replace(",", "."));
                } else {
                    var rows = document.querySelectorAll("#lista tr");
                    for (let j = 0; j < rows.length; j++) {
                        if (rows[j].dataset.preco == this.dataset.preco) {
                            rows[j].remove();
                            total -= parseFloat(this.dataset.preco.replace(",", "."));
                            break;
                        }
                    }
                }

                document.getElementById("total").innerHTML = total.toFixed(2).replace(".", ",");
            });
        }