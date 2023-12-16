let Tenants = [
  {
    Name: "Z & G Party Needs",
    building: "B2- 1A&1B",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 2102.4,
    CurrentReading: 2102.4,
    Consume: 70.2,
  },
  {
    Name: "Racma Store",
    building: "B2-2B",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 296.5,
    CurrentReading: 377.2,
    Consume: 80.7,
  },
  {
    Name: "LANGGA",
    building: "B2-2A",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 515.4,
    CurrentReading: 527.7,
    Consume: 12.3,
  },
  {
    Name: "Aziz Tailoring",
    building: "B2-3B",
    DueDate: "12-05-23",
    PerKwh: 15,
    DateOfReading: "12-01-23",
    PreviousReading: 3648.2,
    CurrentReading: 3726.5,
    Consume: 78.3,
  },
  {
    Name: "Banda",
    building: "B2-8A",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 882.6,
    CurrentReading: 943.3,
    Consume: 60.7,
  },
  {
    Name: "Chicken Wings",
    building: "B1-EXC",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 1496.4,
    CurrentReading: 1612.2,
    Consume: 115.8,
  },
  {
    Name: "Davao Lecon",
    building: "B2-EXC",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 1061.6,
    CurrentReading: 1113.5,
    Consume: 51.9,
  },
  {
    Name: "Sensei Takoyaki",
    building: "B1-EXE",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 2183.5,
    CurrentReading: 2373.9,
    Consume: 190.4,
  },
  {
    Name: "Milktea Kopi",
    building: "B1-EXB",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 1315.7,
    CurrentReading: 1388.6,
    Consume: 72.9,
  },
  {
    Name: "Shawarma",
    building: "B1-EXA",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 745.0,
    CurrentReading: 859.2,
    Consume: 114.2,
  },
  {
    Name: "TGP Pharmacy",
    building: "B1-1A",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 4415.3,
    CurrentReading: 4640.6,
    Consume: 225.3,
  },
  {
    Name: "Pastil Haus",
    building: "B2-EXA",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 374,
    CurrentReading: 386,
    Consume: 12,
  },
  {
    Name: "Kuya J Lechon",
    building: "B1-EXD",
    DueDate: "12-12-23",
    PerKwh: 15,
    DateOfReading: "12-05-23",
    PreviousReading: 954.9,
    CurrentReading: 1049.3,
    Consume: 94.94,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  let selectionDropdown = document.getElementById("selection");
  let bodyElement = document.querySelector(".body");

  Tenants.forEach(function (obj) {
    let option = document.createElement("option");
    option.text = obj.Name;
    selectionDropdown.add(option);
  });

  selectionDropdown.addEventListener("change", function () {
    let selectedOption =
      selectionDropdown.options[selectionDropdown.selectedIndex].text;

    let selectedObject = Tenants.find((obj) => obj.Name === selectedOption);

    let PerKWHNumber = selectedObject.PerKwh * 10;
    let PreviousReadingNumber = selectedObject.PreviousReading * 10;
    let CurrentReadingNumber = selectedObject.CurrentReading * 10;

    let PreviousminusCurrent = CurrentReadingNumber - PreviousReadingNumber;
    let Calculation = (PreviousminusCurrent * PerKWHNumber) / 100;

    document.querySelector(".TotalAmount").innerHTML = Calculation;

    // select to show in HTML
    document.querySelector(".Name").innerHTML = selectedObject.Name;
    document.querySelector(".Building").innerHTML = selectedObject.building;
    document.querySelector(".DueDate").innerHTML = selectedObject.DueDate;
    document.querySelector(".PerKwh").innerHTML = selectedObject.PerKwh;
    document.querySelector(".DateOfReading").innerHTML =
      selectedObject.DateOfReading;
    document.querySelector(".PreviousReading").innerHTML =
      selectedObject.PreviousReading;
    document.querySelector(".CurrentReading").innerHTML =
      selectedObject.CurrentReading;
    document.querySelector(".Consume").innerHTML = selectedObject.Consume;
  });
});
