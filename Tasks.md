1. setup Tailwind css
2. Create Tab container
    - Feeds the data into the Tab component
    - TabData
        - Bills, isBill flag is true
        - Potential Bills, isBill flag is false
3. Create Tab component
    - Tab component should have an hidden list that is active upon click
    - Under the name for each bill row, display the total no of transactions for the bill
    - Add action button to remove bill(Bills tab only)
        - make Patch req to `http://localhost:3000/bills/:id`
        - change isBill flag to false
    - Add action button to add bill(Potential Bills only)
        - make Patch req to `http://localhost:3000/bills/:id`
        - change isBill flag to true
4. Each action updates the list to relect changes

6. Redo with table html structure
7. Rethink component design
8. Style
    - Add faIcons
    - Border around data with background colour
    - Separator between each row & transaction
    - active classes for tabs
    - hover classes for bill row
    - margin between amount & icon
    - get icon for category
9. Add some basic tests