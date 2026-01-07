import './AppCalculator.css';
import { useState, useEffect } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useKalkulator } from './useKalkulator';
import { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'dodaj':
            return "Wykonano dodawanie";
        case 'odejmij':
            return "Wykonano odejmowanie";
        case 'pomnoz':
            return "Wykonano mnożenie";
        case 'podziel':
            return "Wykonano dzielenie";
        case "przywroc":
            return "Przywrócono stan z historii";
        case 'a':
            return "Zmieniono wartość A";
        case 'b':
            return "Zmieniono wartość B";
        default:
            return state;
    }

}

export function AppCalculator() {
    const [liczbaA, setLiczbaA] = useState(null);
    const [liczbaB, setLiczbaB] = useState(null);
    const [wynik, setWynik] = useState(null);
    const [historia, setHistoria] = useState([]);
    const [porownanie, setPorownanie] = useState('');

    const [state, dispatch] = useReducer(reducer, 'brak akcji');
    const { dodaj, odejmij, pomnoz, podziel } = useKalkulator(setHistoria, historia, setWynik, dispatch);

    function liczbaAOnChange(value) {
        setLiczbaA(parsujLiczbe(value));
        dispatch({ type: 'a' });
        zapisDoSessionStorage();

    }

    function parsujLiczbe(value) {
        const sparsowanaLiczba = parseFloat(value);
        if (isNaN(sparsowanaLiczba)) {
            return null;
        } else {
            return sparsowanaLiczba;
        }
    }

    function liczbaBOnChange(value) {
        setLiczbaB(parsujLiczbe(value));
        zapisDoSessionStorage();
        dispatch({ type: 'b' });

    }

    function onAppCalculationHistoryClick(index) {
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        setLiczbaA(historia[index].a);
        setLiczbaB(historia[index].b);
        setWynik(historia[index].wynik);
        zapisDoSessionStorage();
        dispatch({ type: 'przywroc' });
    }
    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    const zapisDoSessionStorage = () => {
        console.log('zapis do sessionStorage');
        const daneDoZapisania = {
            liczbaA: liczbaA,
            liczbaB: liczbaB,
            wynik: wynik,
            historia: historia
        };
        console.log(daneDoZapisania);
        sessionStorage.setItem('appCalculatorData', JSON.stringify(daneDoZapisania));
    }
    // zadanie 4
    useEffect(() => {
        // zodczyt z sessionStorage
        console.log('odczyt z sessionStorage');
        const zapisaneDane = sessionStorage.getItem('appCalculatorData');
        if (zapisaneDane) {

            const dane = JSON.parse(zapisaneDane);
            setLiczbaA(dane.liczbaA);
            setLiczbaB(dane.liczbaB);
            setWynik(dane.wynik);
            setHistoria(dane.historia);
        }
    }, [])
    // zadanie 1
    useEffect(() => {
        if (zablokujPrzyciski) {
            setPorownanie('')
        }
        else {
            if (liczbaA === liczbaB) {
                setPorownanie('Liczba A jest równa liczbie B.');
            } else if (liczbaA > liczbaB) {
                setPorownanie('Liczba A jest większa od liczby B.');
            } else {
                setPorownanie('Liczba B jest większa od liczby A.');
            }
        }
    }, [liczbaA, liczbaB, zablokujPrzyciski]);

    return (
        <div className='app-calculator'>
            <div className='app-calculator-pole'>
                <label>Wynik: </label>
                <span>{wynik}</span>
            </div>

            <hr />

            <div className='app-calculator-pole'>
                <label>Ostatnia akcja: </label>
                <span>{state}</span>
            </div>

            <hr />


            <div className='app-calculator-pole'>
                <label>Dynamiczne porównanie liczb: </label>
                <span>{porownanie}</span>
            </div>

            <hr />

            <div className='app-calculator-pole'>
                <label htmlFor="liczba1">Liczba 1</label>
                <input id="liczba1" type="number" value={liczbaA} onChange={(e) => liczbaAOnChange(e.target.value)} name="liczba1" />
            </div>
            <div className='app-calculator-pole'>
                <label htmlFor="liczba2">Liczba 2</label>
                <input id="liczba2" type="number" value={liczbaB} onChange={(e) => liczbaBOnChange(e.target.value)} name="liczba2" />
            </div>

            <hr />

            <div className='app-calculator-przyciski'>
                <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => {
                    dodaj(liczbaA, liczbaB);
                }} />
                <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => {
                    odejmij(liczbaA, liczbaB);
                }} />
                <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => {
                    pomnoz(liczbaA, liczbaB);
                }} />
                <AppButton disabled={zablokujDzielenie} title="/" onClick={() => {
                    podziel(liczbaA, liczbaB);
                }} />
            </div>

            <hr />

            <div className='app-calculator-historia'>
                <AppCalculationHistory historia={historia} onClick={(index) => onAppCalculationHistoryClick(index)} />
            </div>
        </div>)
}