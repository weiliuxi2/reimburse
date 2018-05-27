package com.wlx.reimburse.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import com.wlx.reimburse.common.RestfulResponse;
import com.wlx.reimburse.config.WebSecurityConfig;
import com.wlx.reimburse.facade.EmploymentFacade;
import com.wlx.reimburse.model.EmploymentVO;

/**
 * 控制器 博客出处：http://www.cnblogs.com/GoodHelper/
 *
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(value = "/api/v1")
public class LoginController {

	@Autowired
	private EmploymentFacade employmentFacade;

    @PostMapping("/loginPost")
    public RestfulResponse<Integer> login(@RequestParam String employmentName, @RequestParam String password, HttpSession session) {
        EmploymentVO employmentVO = new EmploymentVO();
        employmentVO.setName(employmentName);
        employmentVO.setPassword(password);
        EmploymentVO employment = employmentFacade.queryOneByVO(employmentVO);
        if (employment != null ) {
            return new RestfulResponse<Integer>(employment.getId());
        }
        return new RestfulResponse<Integer>(0);
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        // 移除session
        session.removeAttribute(WebSecurityConfig.SESSION_KEY);
        return "redirect:/login";
    }

}