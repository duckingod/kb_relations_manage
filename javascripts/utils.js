module.exports = {
   set_dict: (dict, fieldArray, content_func) => {
       fieldArray.forEach((field) => dict[field] = content_func(field));
   },
   

}
