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
    if (!cod) {
        alert("Introduceți un CodB1");
        return;
    }
    listPesteriByBazin(cod);
}
