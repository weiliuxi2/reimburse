package com.wlx.reimburse.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.dao.DepartmentDAO;
import com.wlx.reimburse.model.DepartmentVO;

@Component
public class DepartmentFacade extends BaseFacade{

	@Autowired
	private DepartmentDAO departmentDAO;
	
	public List<DepartmentVO> query(){
		return departmentDAO.query();
	}
	
	public List<DepartmentVO> queryPaging(DepartmentVO vo){
		return departmentDAO.queryPaging();
	}
	
	public boolean save(DepartmentVO vo){
		super.setSaveTime(vo);
		departmentDAO.save(vo);	
		return true;
	}
	
	public boolean update(DepartmentVO vo){
		super.setUpdateTime(vo);
		departmentDAO.update(vo);
		return true;
	}
	
	public boolean delete(int id){
		departmentDAO.delete(id);
		return true;
	}
	
	
	
}
