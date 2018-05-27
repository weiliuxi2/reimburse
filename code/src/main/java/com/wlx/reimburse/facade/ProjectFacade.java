package com.wlx.reimburse.facade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wlx.reimburse.dao.ProjectDAO;
import com.wlx.reimburse.model.ProjectVO;

@Component
public class ProjectFacade extends BaseFacade{

	@Autowired
	private ProjectDAO DAO;
	
	public List<ProjectVO> query(){
		return DAO.query();
	}
	
	public List<ProjectVO> queryPaging(ProjectVO vo){
		return DAO.queryPaging();
	}
	
	public boolean save(ProjectVO vo){
		super.setSaveTime(vo);
		DAO.save(vo);	
		return true;
	}
	
	public boolean update(ProjectVO vo){
		super.setUpdateTime(vo);
		DAO.update(vo);
		return true;
	}
	
	public boolean delete(int id){
		DAO.delete(id);
		return true;
	}
	
	
	
}
