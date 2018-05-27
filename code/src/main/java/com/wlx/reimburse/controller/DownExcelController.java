package com.wlx.reimburse.controller;



import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wlx.reimburse.excel.ExcelUtil;
import com.wlx.reimburse.excel.model.ReimburseExcelModel;
import com.wlx.reimburse.facade.ReimburseFacade;
import com.wlx.reimburse.model.ReimburseBaseVO;


/**
 * DownExcel.java
 *
 * @author  weiliuxi
 * @since   1.0
 * @version 2018年4月19日 weiliuxi
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1")
public class DownExcelController {
	
	@Autowired
	private ReimburseFacade reimburseFacade;
	

	
    @GetMapping("/down")
    public void downloadExcelTemplate(@RequestParam(required = false) String userName,
    		@RequestParam(required = false) String departmentId,HttpServletRequest request,HttpServletResponse response) throws IOException{
//        InputStream is=DeviceController.class.getResourceAsStream("/device-templet.xlsx"); 
    	String fileName = String.valueOf(System.currentTimeMillis());
    	ReimburseBaseVO vo = new ReimburseBaseVO();
        if (StringUtils.isNotEmpty(userName)) {
        	vo.setEmploymentName(userName);
        	fileName = userName + "-" + fileName;
        }
        if (StringUtils.isNotEmpty(departmentId)) {
        	vo.setDepartmentId(Integer.valueOf(departmentId));
        	fileName = departmentId + "-" + fileName;
        }
        fileName = URLEncoder.encode(fileName, "UTF-8");
    	response.setContentType("application/octet-stream");
    	response.setHeader("Content-Disposition","attachment;filename=" + fileName + ".xls");
    	OutputStream os = response.getOutputStream();
    	Map<String,String> map = new LinkedHashMap<>();
        map.put("danHao","单号");
        map.put("employmentName","姓名");
        map.put("departmentName","部门");
        map.put("name","名称");
        map.put("total","报销总额");
        map.put("status","状态");
        map.put("createTime","报销单创建时间");
        
        map.put("type","类别");  
        map.put("projectBianHao","项目编号");
        map.put("projectName","项目名称");
        map.put("beginTime","开始时间");
        map.put("endTime","结束时间");

        map.put("money","金额");
        map.put("description","备注");
        
        Collection<ReimburseExcelModel> dataset= reimburseFacade.getDownData(vo);
        ExcelUtil.exportExcel(map, dataset, os);
        os.close();
    }
}
