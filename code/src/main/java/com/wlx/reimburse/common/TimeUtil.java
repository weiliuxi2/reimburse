package com.wlx.reimburse.common;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class TimeUtil {
	
	public static String timestamp2string(Timestamp stamp){
		SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd");
		return f.format(stamp);
	}

}
