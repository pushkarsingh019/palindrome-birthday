import "./styles.css";
import { useState } from "react";

export default function App() {
  const [birthday, setBirthday] = useState();
  const [yyyy, setyyyy] = useState();
  const [mm, setmm] = useState();
  const [dd, setdd] = useState();
  const [palindrome, setPalindrome] = useState(false);

  function eventHandler() {
    console.log("I was clicked");
    let dateToUse = birthday;
    main(dateToUse);
  }

  function reverseString(str) {
    var listOfChars = str.split("");
    var reversedListOfChar = listOfChars.reverse();
    var reversedString = reversedListOfChar.join("");
    return reversedString;
  }

  function isStringPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
  }

  function dateInAllFormats(date) {
    const ddmmyyyy = date.day + date.month + date.year;
    const mmddyyyy = date.month + date.day + date.year;
    const yyyymmdd = date.year + date.month + date.day;
    const ddmmyy = date.day + date.month + date.year.slice(-2);
    const mmddyy = date.month + date.day + date.year.slice(-2);
    const yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }

  function checkPalindrome(date) {
    let datesFormatList = dateInAllFormats(date);
    var palindromeList = [];

    for (var i = 0; i < datesFormatList.length; i++) {
      var result = isStringPalindrome(datesFormatList[i]);
      palindromeList.push(result);
    }

    return palindromeList;
  }

  function dateToString(date) {
    var dateInString = { day: "", month: "", year: "" };

    if (date.day < 10) {
      dateInString.day = "0" + date.day;
    } else {
      dateInString.day = date.day.toString();
    }

    if (date.month < 10) {
      dateInString.month = "0" + date.month;
    } else {
      dateInString.month = date.month.toString();
    }

    dateInString.year = date.year.toString();
    return dateInString;
  }

  function formatBirthday(date) {
    if (date !== "") {
      let unformattedDate = date.split("-");
      setyyyy(unformattedDate[0]);
      setmm(unformattedDate[1]);
      setdd(unformattedDate[2]);
    }

    let formattedDate = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    return formattedDate;
  }

  function main(dateToUse) {
    let date = formatBirthday(dateToUse);
    let stringDate = dateToString(date);
    let list = checkPalindrome(stringDate);
    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        setPalindrome(true);
        break;
      }
    }
  }

  return (
    <div className="App">
      <h2>Palindrome Birthday!</h2>
      <label className="input-label">Enter your birthday date:</label>
      <input
        onChange={(event) => setBirthday(event.target.value)}
        className="input"
        id="bday-input"
        type="date"
      />
      <button onClick={eventHandler} id="show-btn">
        Show
      </button>
      <p id="result">{palindrome}</p>
    </div>
  );
}
