// 1. Funcția care citește datele din Supabase
async function listPesteriByBazin(codBazin) {
    // Verificăm dacă variabila există (pentru siguranță)
    if (!window.db_supa) {
        console.error("Conexiunea db_supa nu a fost inițializată!");
        return;
    }
    
    const { data, error } = await window.db_supa
        .from('pesteri_versiuni')
        .select(`
            "CodB1",
            "NrP1",
            "Var",
            "Denumire",
            "DomMorf",
            "NrDesc",
            "AltAbs",
            "AltRel",
            "DezvTot",
            "DenivNC",
            "DenivPC",
            "ExtReal",
            "ExtLong",
            "num_map",
            "Club"
        `)
        .eq('CodB1', codBazin)
        .order('NrP1', { ascending: true });

    if (error) {
        console.error('Eroare Supabase:', error);
        alert("Eroare la citirea datelor din Supabase");
        return;
    }

    renderTable(data);
}


// 2. Funcția care afișează tabelul
function renderTable(rows) {
    const tbody = document.querySelector("#tabelPesteri tbody");
    tbody.innerHTML = "";

    rows.forEach(r => {
        const tr = document.createElement("tr");

        const cols = [
            'CodB1','NrP1','Var','Denumire','NrDesc',
            'AltAbs','AltRel','DezvTot','DenivNC','DenivPC',
            'ExtReal','ExtLong','num_map','Club'
        ];

        cols.forEach(c => {
            const td = document.createElement("td");
            td.textContent = r[c] ?? "";
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}


// 3. Funcția apelată de butonul "Caută"
function loadBazin() {
    const cod = document.getElementById("bazin").value.trim();
    if (!cod) { alert("Introduceți un CodB1"); return; }

 // 3.1. Definim coloanele care apar MEREU (fără să fie în checkbox)
    const coloaneVizibile = ['NrP1', 'Var','Denumire'];

 // 3.2. Adăugăm coloanele pe care utilizatorul le-a ales din checkbox-uri
    const checkboxuri = document.querySelectorAll('.coloana-db:checked');
    checkboxuri.forEach(cb => {
        coloaneVizibile.push(cb.value);
    });
    
// 3.3. Construim lista pentru Supabase (cerem doar ce este în coloaneVizibile)
    const listaSelect = coloaneVizibile.join(',');

    const { data, error } = await window.db_supa
        .from('pesteri_versiuni')
        .select(listaSelect) 
        .eq('CodB1', cod)
        .order('NrP1', { ascending: true });

    if (error) {
        console.error('Eroare:', error);
        alert("Eroare la încărcarea datelor.");
        return;
    }

// 3.4. Afișăm tabelul cu coloanele alese
    renderTable(data, coloaneVizibile);
}

function renderTable(rows, coloaneDeAfisat) {
    const thead = document.querySelector("#tabelPesteri thead tr");
    const tbody = document.querySelector("#tabelPesteri tbody");

    thead.innerHTML = "";
    tbody.innerHTML = "";

    if (!rows || rows.length === 0) {
        tbody.innerHTML = "<tr><td colspan='5'>Nu s-au găsit date pentru acest CodB1.</td></tr>";
        return;
    }
    // Creăm capul de tabel dinamic
    coloaneDeAfisat.forEach(numeColoana => {
        const th = document.createElement("th");
        th.textContent = numeColoana;
        thead.appendChild(th);
    });

    // Populăm rândurile
    rows.forEach(r => {
        const tr = document.createElement("tr");
        coloaneDeAfisat.forEach(numeColoana => {
            const td = document.createElement("td");
            td.textContent = r[numeColoana] ?? "";
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

}

//    listPesteriByBazin(cod);
