import './App.css'
import { AppCalculator } from './AppCalculator'
import { AppHeader } from './AppHeader'
import { useContext, useState } from 'react';
import { FontContext } from './FontProvider';

export default function App() {
  const [czcionka, setCzcionka] = useState('small');

  return (
    <FontContext value={{ czcionka, setCzcionka }}>
      <div className="app" style={{ fontSize: czcionka }}>
        <div>
          <AppHeader imie={'Imię'} nazwisko={'Nazwisko'} />
        </div>
        <div>
          <AppCalculator />
        </div>
      </div>
    </FontContext>
  )
}
