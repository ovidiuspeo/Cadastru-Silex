// 1. Funcția care citește datele din Supabase
async function listPesteriByBazin(codBazin) {
    const { data, error } = await supabase
        .from('pesteri')
        .select(`
            CodB1,
            NrP1,
            Var,
            Denumire,
            SinList,
            SitMarc,
            DomMorf,
            Vale,
            Afluent,
            Versant,
            Munte,
            Nr Desc,
            Ld1,
            Id1,
            Md1,
            Hd1,
            AltAbs,
            AltRel,
            ModCalc,
            DezvTot,
            DenivNC,
            DenivPC,
            ExtReal,
            num_map,
            Club
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
            'CodB1','NrP1','Var','Denumire','SinList','SitMarc','DomMorf',
            'Vale','Afluent','Versant','Munte','Nr Desc','Ld1','Id1','Md1',
            'Hd1','AltAbs','AltRel','ModCalc','DezvTot','DenivNC','DenivPC',
            'ExtReal','num_map','Club'
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
