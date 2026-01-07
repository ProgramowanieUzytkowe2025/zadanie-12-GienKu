export const useKalkulator = (setHistoria, historia, setWynik, dispatch) => {
  function dodaj(liczbaA, liczbaB) {
    aktualizujHistorie(liczbaA, liczbaB, '+', liczbaA + liczbaB);
    dispatch({ type: 'dodaj' });
  }

  function odejmij(liczbaA, liczbaB) {
    aktualizujHistorie(liczbaA, liczbaB, '-', liczbaA - liczbaB);
    dispatch({ type: 'odejmij' });
  }

  function pomnoz(liczbaA, liczbaB) {
    aktualizujHistorie(liczbaA, liczbaB, '*', liczbaA * liczbaB);
    dispatch({ type: 'pomnoz' });
  }

  function podziel(liczbaA, liczbaB) {
    if (liczbaB !== 0) {
      aktualizujHistorie(liczbaA, liczbaB, '/', liczbaA / liczbaB);
        dispatch({ type: 'podziel' });
    }
  }

  function aktualizujHistorie(a, b, operation, wynik) {
    const nowaHistoria = [
      ...historia,
      { a: a, b: b, operation: operation, wynik: wynik },
    ];
    setHistoria(nowaHistoria);
    setWynik(wynik);

    const daneDoZapisania = {
      liczbaA: a,
      liczbaB: b,
      wynik: wynik,
      historia: nowaHistoria,
    };

    sessionStorage.setItem(
      'appCalculatorData',
      JSON.stringify(daneDoZapisania)
    );
  }

  return { dodaj, odejmij, pomnoz, podziel, aktualizujHistorie };
};
