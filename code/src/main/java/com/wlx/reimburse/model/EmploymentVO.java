package com.wlx.reimburse.model;

import javax.persistence.Column;
import javax.persistence.Table;

@Table(name = "employment")
public class EmploymentVO extends BaseVO {

	@Column(name = "name")
	private String name;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "sex")
	private int sex;
	
	@Column(name = "age")
	private int age;
	
	@Column(name = "telephone")
	private String telephone;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "employment_id")
	private String employmentId;
	
	@Column(name = "department_id")
	private int departmentId;
	
	@Column(name = "type")
	private int type;
	
	@Column(name = "permission")
	private int permission;
	
	private String departmentName;
	
	
	
	

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmploymentId() {
		return employmentId;
	}

	public void setEmploymentId(String employmentId) {
		this.employmentId = employmentId;
	}


	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getPermission() {
		return permission;
	}

	public void setPermission(int permission) {
		this.permission = permission;
	}

	
	
}
