// World Train v0: TrainID, Track Conductor, Passengers
// v0.0: Trains & Conductor
// v0.1: Restructured
// comment out (and delete for final release) future values for v1
// v1 goal:  Access Control allow Tippi to issue CREW_ROLE, which permits access to CheckIn in any car, and lots of features.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

    contract WorldTrain01 {
    struct Train {
        string conductorName;
        address conductor;
        uint128 vipPassengers;
        uint128 passengers;
    }

    uint8 public trainCount = 0;

    mapping(uint8 => Train) public trains;
    mapping(address => bool) public isVIP;
    mapping(address => bool) public welcomedPassenger;

    event CrewAssigned(uint8 indexed trainId, address indexed crewMember);

    constructor() {
        _addTrain("Tippi", msg.sender);
    }

    function welcomePassenger(uint8 _trainId, address _who, bool _isVip) external {
        require(msg.sender == trains[_trainId].conductor, "Only train conductor can welcome passengers rn.");
        require(welcomedPassenger[_who] != true , "Passenger has already been welcomed, chill");
        welcomedPassenger[_who] = true;
        trains[_trainId].passengers++;
        if (_isVip){
            isVIP[_who] = true;
            trains[_trainId].vipPassengers++;
        }
    }

    function _addTrain(string memory _conductorName, address _conductor) private {
        trains[trainCount] = Train(_conductorName, _conductor, 0, 0);
        emit CrewAssigned(trainCount, _conductor);
        trainCount++;
    }
}