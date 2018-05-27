package com.wlx.reimburse.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.dao.EmploymentDAO;
import com.wlx.reimburse.model.EmploymentVO;

@Component
public class EmploymentFacade extends BaseFacade{

	@Autowired
	private EmploymentDAO employmentDAO;
	
	public List<EmploymentVO> query(){
		return employmentDAO.query();
	}
	
	public List<EmploymentVO> queryByVO(EmploymentVO vo){
		return employmentDAO.queryByVO(vo);
	}
	
	public List<EmploymentVO> queryPaging(EmploymentVO vo){
		return employmentDAO.queryPaging();
	}
	
	public boolean save(EmploymentVO vo){
		super.setSaveTime(vo);
		employmentDAO.save(vo);	
		return true;
	}
	
	public boolean update(EmploymentVO vo){
		super.setUpdateTime(vo);
		employmentDAO.update(vo);
		return true;
	}
	
	public boolean delete(int id){
		employmentDAO.delete(id);
		return true;
	}
	
	public EmploymentVO queryOneByVO(EmploymentVO vo){
		return employmentDAO.queryOneByVO(vo);
	}
	
	public boolean updatePassword(EmploymentVO vo) {
		employmentDAO.update(vo);
		return true;
	}
	
	
}
