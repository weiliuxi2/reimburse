package com.wlx.reimburse.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "reimburse_base")
public class ReimburseBaseVO extends BaseVO {

	@Column(name = "employmentName")
	private String employmentName;
	
	@Column(name = "departmentId")
	private int departmentId;
	
	
	@Column(name = "total")
	private String total;
	
	@Column(name = "begin_time")
	private Timestamp beginTime;
	
	@Column(name = "end_time")
	private Timestamp endTime;
	
	@Column(name = "dan_hao")
	private String danHao;

	@Column(name = "status")
	private int status;
	
	@Column(name = "name")
	private String name;
	
	
	private int pageNo;
	
	private int pageSize;
	
	


	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	private String bigTypeName;
	
	
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "departmentName")
	private String departmentName;
	
	
	
	
	
	
	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getBigTypeName() {
		return bigTypeName;
	}

	public void setBigTypeName(String bigTypeName) {
		this.bigTypeName = bigTypeName;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
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

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}



	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public Timestamp getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Timestamp beginTime) {
		this.beginTime = beginTime;
	}

	public Timestamp getEndTime() {
		return endTime;
	}

	public void setEndTime(Timestamp endTime) {
		this.endTime = endTime;
	}
	
	

	
}
