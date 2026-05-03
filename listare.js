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
function renderTable(rows, coloaneDeAfisat) {
    const theadRow = document.querySelector("#tabelPesteri thead tr");
    const tbody = document.querySelector("#tabelPesteri tbody");

    // Ștergem header-ul și body-ul vechi
    theadRow.innerHTML = "";
    tbody.innerHTML = "";

    // 2.1. Generăm titlurile coloanelor (Header)
    coloaneDeAfisat.forEach(numeColoana => {
        const th = document.createElement("th");
        th.textContent = numeColoana; 
        theadRow.appendChild(th);
    });

    // 2.2. Generăm celulele cu date (Body)
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
