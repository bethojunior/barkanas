class DateService {

    static treatDate(dateForTreat) {

        var dateComplet = dateForTreat.split(" ");
        var firstDate   = dateComplet[0];  
        var firstDate   = firstDate.split("-");
        var year        = firstDate[0];
        var month       = firstDate[1];
        var day         = firstDate[2];

        var firstDate   = day+"/"+month+"/"+year;
        var secondDate  = dateComplet[1];
        return firstDate + " " + secondDate;
        
    }

}