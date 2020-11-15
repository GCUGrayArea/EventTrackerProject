# SD27 homework, week 12 : Event Tracker

This project calls on us to make a REST API delivering basic CRUD functionality for at least one table. For this specific project I've created a Spring boot app that allows a user to track their bar tabs over several nights out, including the location visited and the drinks purchased at each location via a MySQL database. Spring Data JPA is used to simplify coding of the API, so no explicit `EntityManager` objects or JPQL queries need be included. In addition to basic CRUD functionality, limited functionality is provided to filter the list of bar tabs by location.

API endpoints and their functionality are as follows:
| HTTP Verb | URI                                  | Request Body                                         | Response Body                                                            | Purpose           |
|-----------|--------------------------------------|------------------------------------------------------|--------------------------------------------------------------------------|-------------------|
| GET       | `/api/{tabId}/drinks/{drinkId}`      |                                                      | representation of drink `drinkId` on tab `tabId`, if it exists           | RETRIEVE endpoint |
| GET       | `/api/{tabId}/drinks                 |                                                      | list of *drink* resources with matching *tab*                            | RETRIEVE endpoint |
| POST      | `/api/tabs/{tabId}/drinks`           | representation of a new *drink* resource             | description of the result of the operation                               | CREATE endpoint   |
| PUT       | `/api/tabs/{tabId}/drinks/{drinkId}` | representation of a new version of *drink* `drinkId` | updated *drink* resource                                                 | UPDATE endpoint   |
| DELETE    |  `api/tabs/{tabId}/drinks/{drinkId}` |                                                      |                                                                          | DELETE endpoint   |
| GET       | `api/tabs`                           |                                                      | list of all *tab* resources                                              | RETRIEVE endpoint |
| GET       | `api/tabs/{id}`                      |                                                      | representation of tab `id`, if it exists                                 | RETRIEVE endpoint |
| GET       | `api/tabs/search/{keyword}`          |                                                      | list of *tab* resources with *location* field matching the given keyword | RETRIEVE endpoint |
| POST      | `api/tabs/`                          | representation of a new  *tab*  resource             | description of the result of the operation                               | CREATE endpoint   |
| PUT       | `api/tabs/{id}`                      | representation of a new version of  *tab* `id`       | updated *tab* resource                                                   | UPDATE endpoint   |
| DELETE    | `api/tabs/{id}`                      |                                                      |                                                                          | DELETE endpoint   |
