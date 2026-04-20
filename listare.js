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
