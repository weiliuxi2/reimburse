package com.wlx.reimburse.excel;



import java.io.IOException;
import java.io.OutputStream;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * DownExcel.java
 *
 * @author  weiliuxi
 * @since   1.0
 * @version 2018年4月19日 weiliuxi
 */
//@RestController
public class DownExcel {

	
	   /**
     * @param request request
     * @param response  response
     * @throws IOException aa
     * 
     */
    //@GetMapping("/down")
    public void downloadExcelTemplate(HttpServletRequest request,HttpServletResponse response) throws IOException{
//        InputStream is=DeviceController.class.getResourceAsStream("/device-templet.xlsx"); 
    	response.setContentType("application/octet-stream");
    	response.setHeader("Content-Disposition","attachment;filename=device-templet.xls");
    	OutputStream os = response.getOutputStream();
    	Map<String,String> map = new LinkedHashMap<>();
        map.put("a","姓名");
        map.put("b","年龄");
        map.put("c","性别");
        map.put("d","出生日期");
        map.put("updateTime","出生日期2");
        Collection<Object> dataset=new ArrayList<Object>();
        dataset.add(new Model("", "", "",null,new Timestamp(System.currentTimeMillis())));
        dataset.add(new Model(null, null, null,null,new Timestamp(System.currentTimeMillis())));
        dataset.add(new Model("王五", "34", "男",new Date(),new Timestamp(System.currentTimeMillis())));
        ExcelUtil.exportExcel(map, dataset, os);
        os.close();
    }
}
