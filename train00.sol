// World Train v0: TrainID, Track Conductor, Passengers, VIP Passengers, Add Train
// v1.0 goal:  Access Control allow Tippi to issue CREW_ROLE, which permits access to CheckIn in any car, and lots of features that a train might need.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

    contract WorldTrain00 {
    struct Train {
        string conductorName;
        address conductor;
        uint128 vipPassengers;
        uint128 passengers;
    }

    uint8 public trainCount = 0;

    mapping(uint8 => Train) public trains;

    event CrewAssigned(uint8 indexed trainId, address indexed crewMember);

    constructor() {
        _addTrain("Tippi", msg.sender);
        // Tippi's friends ride free
        trains[0].passengers = 55;
        trains[0].vipPassengers = 5;
    }

    function _addTrain(string memory _conductorName, address _conductor) private {
        trains[trainCount] = Train(_conductorName, _conductor, 0, 0);
        emit CrewAssigned(trainCount, _conductor);
        trainCount++;
    }
}