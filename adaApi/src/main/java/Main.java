import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class Main {

	public static void main(String[] args) throws ParseException {
		
		
		Date saleDate = new Date("01/01/2018");
		
		//int ano = saleDate.get(Calendar.YEAR);
		//int mes = saleDate.get(Calendar.MONTH);
		//int dia = saleDate.get(Calendar.DATE);
		
		System.out.println(saleDate);

	}

}

