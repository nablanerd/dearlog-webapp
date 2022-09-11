const intl=new Intl.DateTimeFormat("fr",  
{
  hour12: false, 
  hour: "2-digit", 
  minute: "2-digit", 
  second:"2-digit", 
  day:"2-digit", 
  month:"2-digit", 
  year:"numeric"
});

class Format 
{

  date(str)
  {
    return intl.format(new Date(str))
  }


  string(str)
  {
    return str || ""
  }

}

export default Format;
