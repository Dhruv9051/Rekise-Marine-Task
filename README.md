# Rekise Marine Assignment

This project is created with React and Open Layers.

## Components

Drawing Linestrings
Drawing Polygons
Modals
Tables

### Walkthrough

Click on the link to visit the deployed website.

The opening screen looks like this:

![image](https://github.com/user-attachments/assets/775eca1b-d94d-4244-a430-3d5fe3d1de83)

Next, the user needs to click on Draw to start the interaction. A modal window then opens, providing the option to Generate Data and draw Linestrings.

![image](https://github.com/user-attachments/assets/365538d3-a26b-4a72-b42e-1a20a7519847)

On selecting the Generate data button, the user can draw line strings on the map.

![image](https://github.com/user-attachments/assets/4513ae00-3f0f-40c2-b1d5-1801f28c84b9)

Users can make multiple lines through it. If the current interaction needs to be discarded users can click the "Esc" button else if the users want to record the current interaction they can press "Enter" which would stop further line creations and show the Draw button again.

![image](https://github.com/user-attachments/assets/18c429c3-54a2-4cea-8778-f8593f51f924)

Now, when clicking the Draw button, users can see that the coordinates for the Linestrings have been recorded and stored in a table.

![image](https://github.com/user-attachments/assets/282ab5f8-840c-4794-9d6f-eb0687b0ef9e)

Users can select the three-dot option in the Actions column to create a Polygon associated with the selected Linestring waypoint. There are two options and anyone can be selected.

![image](https://github.com/user-attachments/assets/b60c7f4c-b22c-41d2-96c2-9c36c12c03db)

Upon selecting it a new modal shows up which is the Polygon tool modal. 
There are three options here:
- Mission Planner button: Takes you to the previous modal (Mission Creation).
- Discard button: Discards the creation of Polygon and returns you to the Main screen.
- Import Points button: On clicking this, the user gets equipped to interact with the map again but this time the user may draw polygons.

![image](https://github.com/user-attachments/assets/2dcad398-bdaf-4d2f-ba05-abe7589a4cf0)

![image](https://github.com/user-attachments/assets/daf7c3bf-55e3-453f-922c-b125ae2e0df9)

This tool has the same functionality as the Linestring where you can press "Esc" to end the interaction or press "Enter" to record the interaction.

After pressing "Enter" we need to navigate back to the Draw button -> Select the waypoint we used to create a Polygon (We can see that the points that have associated Polygons to it have a name change on the coordinates column).

![image](https://github.com/user-attachments/assets/a351c9c1-18ca-45e1-81a9-c4f11236eb44)

If we select the waypoint and enter the Polygon tool again we can see the recorded coordinates of the Polygon associated with the waypoint. We can add multiple polygons as well.

![image](https://github.com/user-attachments/assets/59507d3b-39e3-42ae-9c1b-5e9e73533a23)

## Key Functionalities

- Press "Esc" to exit interaction.
- Press "Enter" to collect the current interaction.
- Custom logic for coordinate format on Polygon tool.
- Logic to record polygons and associate them to the waypoints.
- Multiple coordinates can be recorded.
- Custom hook to adjust map according to screen size.
- Other optimizations included as well for rendering, cleanups, etc.
- Navigation between modals and buttons and logic for their existence.
- Applied React best practices along with proper file structuring as well.
- Usage of the testing library (Jest) for writing unit test cases.
