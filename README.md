# stomble-space-ship-travel

The followings are functionalities of this project.

* Add spaceships: a spaceship must have an id, name, model, location (made up of a city and a planet) and its status (decommissioned, maintenance or operational).
* Update the spaceship status: to one of the 3 possible states.
* Add a location: a location must have an id, city name and a planet name; as well as the spaceport capacity (how many spaceships can be stationed at this location simultaneously).
* Remove spaceships: given a spaceship’s id.
* Remove location: given a location’s id.
* Travel functionality: Travel involves changing the location of the spaceship and adjusting the capacity of the source and destination spaceports. Before carrying out the travel transaction, check these two factors:
* The spaceport capacity of the destination (if not, return an appropriate error).
* The status of the spaceship (only operational spaceships can travel).
