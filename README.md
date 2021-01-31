# Login with Face Detection (Artificial Intelligence)

to the point gaes :"

# How to use ?

  1. you must be run this project with the server, ex: in here i will run with php server.
  ``` $ php -S localhost:8080 ```
  2. open in your browser: ``` http://localhost:8080/login ```
  3. for detect your face, you can take your picture and copy to folder
  ``` login/sample/YOUR_NAME_FOLDER/1.jpg ```
    ex: ``` login/sample/Iqbal Maulana/1.jpg ```

  4. after that, you can edit **main.js** in the folder
  ``` login/js/main.js ```
    edit code like this:
     ``` 
        // line 86
        function getLabeledImages(){
            const labels = ['Brillyan Ilham', 'Iqbal Maulana'] // <--- add your folder picture name
            ....   
        }
        ```
    5. result :
    ![alt text](https://i.ibb.co/ZL2BrdT/Screenshot-2021-01-31-at-10-44-20-AM.png)
    ![alt text](https://i.ibb.co/YX7wfWf/Screenshot-2021-01-31-at-10-44-27-AM.png)


