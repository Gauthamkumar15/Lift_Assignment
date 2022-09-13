let liftBox = document.getElementById("liftBox");
let leftDoor = document.getElementById("leftDoor");
let rightDoor = document.getElementById("rightDoor");
let liftStatusPick = document.getElementById("liftStatusPick");
let liftStatusDrop = document.getElementById("liftStatusDrop");
let liftStatus = document.getElementById("liftStatus");

let liftRequestAndDestination = [];
let liftState = "rest";
let liftPosition = 0;
let liftDirection;
let shouldWeOpenDoors;

function MoveLiftUp() {
  setTimeout(() => {
    liftBox.className = "lift-box";

    if (liftPosition != 3) {
      liftBox.classList.add(
        `lift-moving-${liftPosition}-to-${liftPosition + 1}`
      );
      liftPosition += 1;
    }
    if (
      liftRequestAndDestination.filter(
        (eachItem) => eachItem.from > liftPosition || eachItem.to > liftPosition
      ).length === 0
    ) {
      liftDirection = "down";
    }
    isLiftDoorsShouldOpen();
  }, 5000);
}

function MoveLiftDown() {
  setTimeout(() => {
    liftBox.className = "lift-box";

    if (liftPosition != 0) {
      liftBox.classList.add(
        `lift-moving-${liftPosition}-to-${liftPosition - 1}`
      );
      liftPosition -= 1;
    }
    if (
      liftRequestAndDestination.filter(
        (eachItem) => eachItem.from < liftPosition || eachItem.to < liftPosition
      ).length === 0
    ) {
      liftDirection = "up";
    }
    isLiftDoorsShouldOpen();
  }, 5000);
}

function shouldWeMoveUpOrDown() {
  console.table(liftRequestAndDestination);
  if (
    liftRequestAndDestination.filter(
      (eachItem) => eachItem.from !== null || eachItem.to !== null
    ).length === 0
  ) {
    console.table(liftRequestAndDestination);
    console.log("Lift is at rest");
    liftStatus.textContent = "Lift is at Rest";
    liftState = "rest";
  } else if (
    liftDirection === "up" &&
    liftRequestAndDestination.filter(
      (eachItem) =>
        eachItem.from > liftPosition ||
        (eachItem.from === null && eachItem.to > liftPosition)
    ).length > 0
  ) {
    MoveLiftUp();
  } else if (
    liftDirection === "down" &&
    liftRequestAndDestination.filter(
      (eachItem) =>
        eachItem.from < liftPosition ||
        (eachItem.from === null && eachItem.to < liftPosition)
    ).length > 0
  ) {
    MoveLiftDown();
  } else if (
    liftDirection === "up" &&
    liftRequestAndDestination.filter(
      (eachItem) =>
        eachItem.from < liftPosition ||
        (eachItem.from === null && eachItem.to < liftPosition)
    ).length > 0
  ) {
    MoveLiftDown();
  } else if (
    liftDirection === "down" &&
    liftRequestAndDestination.filter(
      (eachItem) =>
        eachItem.from > liftPosition ||
        (eachItem.from === null && eachItem.to > liftPosition)
    ).length > 0
  ) {
    MoveLiftUp();
  }
}

function openDoorsAndCloseDoors() {
  setTimeout(() => {
    console.log("openDoorsAndCloseDoors");
    leftDoor.classList.remove("left-door-closes");
    rightDoor.classList.remove("right-door-closes");
    leftDoor.classList.add("left-door-opens");
    rightDoor.classList.add("right-door-opens");
    setTimeout(() => {
      liftStatusPick.textContent = "Pick Status";
      liftStatusDrop.textContent = "Drop Status";
      leftDoor.classList.remove("left-door-opens");
      rightDoor.classList.remove("right-door-opens");
      leftDoor.classList.add("left-door-closes");
      rightDoor.classList.add("right-door-closes");
      shouldWeMoveUpOrDown();
    }, 5000);
  }, 5000);
}

function isLiftDoorsShouldOpen() {
  console.log("isLiftDoorsShouldOpen");
  shouldWeOpenDoors = 0;
  console.log(
    liftRequestAndDestination.filter(
      (eachItem) => eachItem.from === null && eachItem.to == liftPosition
    )
  );
  console.log(liftPosition);

  if (
    liftRequestAndDestination.filter(
      (eachItem) => eachItem.from === null && eachItem.to == liftPosition
    ).length > 0
  ) {
    console.log(`Dropping Persons in Floor${liftPosition}`);
    liftStatusDrop.textContent = `Dropping Persons in Floor${liftPosition}`;
    shouldWeOpenDoors = 1;
    for (let i = 0; i < liftRequestAndDestination.length; i++) {
      if (
        liftRequestAndDestination[i].from === null &&
        liftRequestAndDestination[i].to == liftPosition
      ) {
        liftRequestAndDestination[i].to = null;
      }
    }
  }

  if (
    (liftPosition == 0 &&
      liftRequestAndDestination.filter((eachItem) => eachItem.from == 0)
        .length > 0) ||
    (liftPosition == 3 &&
      liftRequestAndDestination.filter((eachItem) => eachItem.from == 3)
        .length > 0)
  ) {
    console.log(`Picking up Persons in Floor${liftPosition}`);
    liftStatusPick.textContent = `Picking up Persons in Floor${liftPosition}`;
    shouldWeOpenDoors = 1;
    for (let i = 0; i < liftRequestAndDestination.length; i++) {
      if (liftRequestAndDestination[i].from == liftPosition) {
        document.getElementById(
          `floor${liftRequestAndDestination[i].from}${liftRequestAndDestination[i].to}`
        ).className = "";
        liftRequestAndDestination[i].from = null;
      }
    }
  } else if (
    liftDirection === "up" &&
    liftRequestAndDestination.filter(
      (eachItem) => eachItem.from == liftPosition && eachItem.to > liftPosition
    ).length > 0
  ) {
    console.log(`Picking up Persons in Floor${liftPosition}`);
    liftStatusPick.textContent = `Picking up Persons in Floor${liftPosition}`;

    shouldWeOpenDoors = 1;
    for (let i = 0; i < liftRequestAndDestination.length; i++) {
      if (
        liftRequestAndDestination[i].from == liftPosition &&
        liftRequestAndDestination[i].to > liftPosition
      ) {
        document.getElementById(
          `floor${liftRequestAndDestination[i].from}${liftRequestAndDestination[i].to}`
        ).className = "";
        liftRequestAndDestination[i].from = null;
      }
    }
  } else if (
    liftDirection === "down" &&
    liftRequestAndDestination.filter(
      (eachItem) => eachItem.from == liftPosition && eachItem.to < liftPosition
    ).length > 0
  ) {
    console.log(`Picking up Persons in Floor${liftPosition}`);
    liftStatusPick.textContent = `Picking up Persons in Floor${liftPosition}`;
    shouldWeOpenDoors = 1;
    for (let i = 0; i < liftRequestAndDestination.length; i++) {
      if (
        liftRequestAndDestination[i].from == liftPosition &&
        liftRequestAndDestination[i].to < liftPosition
      ) {
        document.getElementById(
          `floor${liftRequestAndDestination[i].from}${liftRequestAndDestination[i].to}`
        ).className = "";
        liftRequestAndDestination[i].from = null;
      }
    }
  }

  if (shouldWeOpenDoors == 1) {
    for (let i = 0; i < liftRequestAndDestination.length; i++) {
      if (
        liftRequestAndDestination[i].from === null &&
        liftRequestAndDestination[i].to === null
      ) {
        liftRequestAndDestination.splice(i, 1);
      }
    }
    console.table(liftRequestAndDestination);
    openDoorsAndCloseDoors();
  } else {
    for (let i = 0; i < liftRequestAndDestination.length; i++) {
      if (
        liftRequestAndDestination[i].from === null &&
        liftRequestAndDestination[i].to === null
      ) {
        liftRequestAndDestination.splice(i, 1);
      }
    }
    shouldWeMoveUpOrDown();
  }
}

function MoveUpOrDown(from, to) {
  console.log(liftPosition);
  console.log("MoveuporDown");
  if (liftPosition == 0) {
    liftDirection = "up";
    liftStatus.textContent = "Lift Moving";
    isLiftDoorsShouldOpen();
  } else if (liftPosition == 3) {
    liftDirection = "down";
    liftStatus.textContent = "Lift Moving";
    isLiftDoorsShouldOpen();
  } else if (
    from > liftPosition ||
    (from == liftPosition && to > liftPosition)
  ) {
    liftDirection = "up";
    liftStatus.textContent = "Lift Moving";
    isLiftDoorsShouldOpen();
  } else if (
    from < liftPosition ||
    (from == liftPosition && to < liftPosition)
  ) {
    liftDirection = "down";
    liftStatus.textContent = "Lift Moving";
    isLiftDoorsShouldOpen();
  }
}

function floorRequest(from, to) {
  liftRequestAndDestination.push({ from, to });
  document
    .getElementById(`floor${from}${to}`)
    .classList.add("button-color-on-click");
  console.table(liftRequestAndDestination);
  if (liftState === "rest") {
    liftState = "moving";
    let id = setTimeout(() => {
      MoveUpOrDown(from, to);
    }, 5000);
  }
}
