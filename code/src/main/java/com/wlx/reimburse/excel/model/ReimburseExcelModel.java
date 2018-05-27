package com.wlx.reimburse.excel.model;

import java.io.Serializable;
import java.sql.Timestamp;

import com.wlx.reimburse.excel.ExcelCell;

public class ReimburseExcelModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
    @ExcelCell(index = 0)
    private String danHao;
    @ExcelCell(index = 1)
    private String employmentName;
    @ExcelCell(index = 2)
    private String departmentName;
    @ExcelCell(index = 3)
    private String name;    
    @ExcelCell(index = 4)
    private String total;
    @ExcelCell(index = 5)
    private String status;
    @ExcelCell(index =6)
    private Timestamp createTime;
    
    
    @ExcelCell(index = 7)
    private String type;
    @ExcelCell(index = 8)
    private String projectBianHao;
    @ExcelCell(index = 9)
    private String projectName;
    @ExcelCell(index = 10)
    private String beginTime;
    @ExcelCell(index = 11)
    private String endTime;
    @ExcelCell(index = 12)
    private String money;
    @ExcelCell(index = 13)
    private String description;
    
    public ReimburseExcelModel() {
    	
    }
    
    public ReimburseExcelModel(String type,String projectBianHao,String projectName,String beginTime,String endTime,
    		String money,String description) {
    	this.danHao = null;
    	this.employmentName = null;
    	this.departmentName = null;
    	this.total = null;
    	this.status = null;
    	this.createTime = null;
    	this.name = null;
    	
    	this.type = type;
    	this.beginTime = beginTime;
    	this.endTime = endTime;    	
    	this.projectBianHao = projectBianHao;
    	this.projectName = projectName;   	
    	this.money = money;
    	this.description = description;
    }
    
    public ReimburseExcelModel(String danHao,String employmentName,String departmentName,String name,String total, 
    		Timestamp createTime,String status) {
    	this.danHao = danHao;
    	this.employmentName = employmentName;
    	this.departmentName = departmentName;
    	this.total = total;
    	this.status = status;
    	this.createTime = createTime;
    	this.name = name;
    	
    	this.type = null;
    	this.beginTime = null;
    	this.endTime = null;    	
    	this.projectBianHao = null;
    	this.projectName = null;   	
    	this.money = null;
    	this.description = null;
    }

	public String getDanHao() {
		return danHao;
	}

	public void setDanHao(String danHao) {
		this.danHao = danHao;
	}

	public String getEmploymentName() {
		return employmentName;
	}

	public void setEmploymentName(String employmentName) {
		this.employmentName = employmentName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Timestamp getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Timestamp createTime) {
		this.createTime = createTime;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getProjectBianHao() {
		return projectBianHao;
	}

	public void setProjectBianHao(String projectBianHao) {
		this.projectBianHao = projectBianHao;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getMoney() {
		return money;
	}

	public void setMoney(String money) {
		this.money = money;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
    
    

    

}
