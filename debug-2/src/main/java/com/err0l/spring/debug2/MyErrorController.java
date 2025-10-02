package com.err0l.spring.debug2;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.*;

@RequestMapping("${server.error.path:${error.path:/error}}")
@Controller
public class MyErrorController {

    private static final String ERROR_INTERNAL_ATTRIBUTE = MyErrorController.class.getName() + ".ERROR";
    protected HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        try {
            return HttpStatus.valueOf(statusCode);
        }
        catch (Exception ex) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private Map<String, Object> getErrorAttributes(WebRequest webRequest, boolean includeStackTrace) {
        Map<String, Object> errorAttributes = new LinkedHashMap<>();
        errorAttributes.put("timestamp", new Date());
        addStatus(errorAttributes, webRequest);
        addErrorDetails(errorAttributes, webRequest, includeStackTrace);
        addPath(errorAttributes, webRequest);
        return errorAttributes;
    }

    private void addPath(Map<String, Object> errorAttributes, RequestAttributes requestAttributes) {
        String path = getAttribute(requestAttributes, RequestDispatcher.ERROR_REQUEST_URI);
        if (path != null) {
            errorAttributes.put("path", path);
        }
    }

    private void addStackTrace(Map<String, Object> errorAttributes, Throwable error) {
        StringWriter stackTrace = new StringWriter();
        error.printStackTrace(new PrintWriter(stackTrace));
        stackTrace.flush();
        errorAttributes.put("trace", stackTrace.toString());
    }

    @SuppressWarnings("unchecked")
    private <T> T getAttribute(RequestAttributes requestAttributes, String name) {
        return (T) requestAttributes.getAttribute(name, RequestAttributes.SCOPE_REQUEST);
    }

    private void addStatus(Map<String, Object> errorAttributes, RequestAttributes requestAttributes) {
        Integer status = getAttribute(requestAttributes, RequestDispatcher.ERROR_STATUS_CODE);
        if (status == null) {
            errorAttributes.put("status", 999);
            errorAttributes.put("error", "None");
            return;
        }
        errorAttributes.put("status", status);
        try {
            errorAttributes.put("error", HttpStatus.valueOf(status).getReasonPhrase());
        }
        catch (Exception ex) {
            // Unable to obtain a reason
            errorAttributes.put("error", "Http Status " + status);
        }
    }
    public Throwable getError(WebRequest webRequest) {
        Throwable exception = getAttribute(webRequest, ERROR_INTERNAL_ATTRIBUTE);
        if (exception == null) {
            exception = getAttribute(webRequest, RequestDispatcher.ERROR_EXCEPTION);
        }
        return exception;
    }
    private void addErrorDetails(Map<String, Object> errorAttributes, WebRequest webRequest,
                                 boolean includeStackTrace) {
        Throwable error = getError(webRequest);
        if (error != null) {
            while (error instanceof ServletException && error.getCause() != null) {
                error = error.getCause();
            }
            errorAttributes.put("exception", error.getClass().getName());
            if (includeStackTrace) {
                addStackTrace(errorAttributes, error);
            }
        }
        addErrorMessage(errorAttributes, webRequest, error);
    }

    private void addErrorMessage(Map<String, Object> errorAttributes, WebRequest webRequest, Throwable error) {
//        BindingResult bindingResult = extractBindingResult(error);
//        if (bindingResult != null) {
//            addMessageAndErrorsFromBindingResult(errorAttributes, bindingResult);
//        }
//        else {
//            MethodValidationResult methodValidationResult = extractMethodValidationResult(error);
//            if (methodValidationResult != null) {
//                addMessageAndErrorsFromMethodValidationResult(errorAttributes, methodValidationResult);
//            }
//            else {
//                addExceptionErrorMessage(errorAttributes, webRequest, error);
//            }
//        }
        addExceptionErrorMessage(errorAttributes, webRequest, error);
    }
    protected String getMessage(WebRequest webRequest, Throwable error) {
        Object message = getAttribute(webRequest, RequestDispatcher.ERROR_MESSAGE);
        if (!ObjectUtils.isEmpty(message)) {
            return message.toString();
        }
        if (error != null && StringUtils.hasLength(error.getMessage())) {
            return error.getMessage();
        }
        return "No message available";
    }
    private void addExceptionErrorMessage(Map<String, Object> errorAttributes, WebRequest webRequest, Throwable error) {
        errorAttributes.put("message", getMessage(webRequest, error));
    }

    @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView errorHtml(HttpServletRequest request, HttpServletResponse response) {
        HttpStatus status = getStatus(request);
        WebRequest webRequest = new ServletWebRequest(request);
        Map<String, Object> model = Collections
                .unmodifiableMap(getErrorAttributes(webRequest, true));
        response.setStatus(status.value());
        // ModelAndView modelAndView = resolveErrorView(request, response, status, model);
        return new ModelAndView("error", model);
    }

    @RequestMapping
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        HttpStatus status = getStatus(request);
        if (status == HttpStatus.NO_CONTENT) {
            return new ResponseEntity<>(status);
        }

        WebRequest webRequest = new ServletWebRequest(request);
        Map<String, Object> body = getErrorAttributes(webRequest, true);
        return new ResponseEntity<>(body, status);
    }

    @ExceptionHandler(HttpMediaTypeNotAcceptableException.class)
    public ResponseEntity<String> mediaTypeNotAcceptable(HttpServletRequest request) {
        HttpStatus status = getStatus(request);
        return ResponseEntity.status(status).build();
    }
}