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
        return;
    }

    renderTable(data);
}
// 2. Funcția care afișează tabelul în HTML
function renderTable(rows) {
    const table = document.getElementById('tabelPesteri');
    table.innerHTML = '';

    const cols = [
        'CodB1', 'NrP1', 'Var', 'Denumire', 'SinList',
        'SitMarc', 'DomMorf', 'Vale', 'Afluent', 'Versant',
        'Munte', 'Nr Desc', 'Ld1', 'Id1', 'Md1', 'Hd1',
        'AltAbs', 'AltRel', 'ModCalc', 'DezvTot',
        'DenivNC', 'DenivPC', 'ExtReal', 'num_map', 'Club'
    ];

    const header = document.createElement('tr');
    cols.forEach(c => {
        const th = document.createElement('th');
        th.textContent = c;
        header.appendChild(th);
    });
    table.appendChild(header);

    rows.forEach(r => {
        const tr = document.createElement('tr');
        cols.forEach(c => {
            const td = document.createElement('td');
            td.textContent = r[c] ?? '';
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}
