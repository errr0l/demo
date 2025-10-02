package com.err0l.spring.debug2;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.AbstractHttpMessageConverter;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class Map2JsonHttpMessageConverter extends AbstractHttpMessageConverter<Map<Object, Object>> {

    Map2JsonHttpMessageConverter() {
        super(StandardCharsets.UTF_8, MediaType.APPLICATION_JSON, MediaType.ALL);
    }

    @Override
    protected boolean supports(Class<?> clazz) {
        return Map.class.isAssignableFrom(clazz);
    }

    @Override
    protected Map<Object, Object> readInternal(Class<? extends Map<Object, Object>> clazz, HttpInputMessage inputMessage) throws IOException, HttpMessageNotReadableException {
        return null;
    }

    @Override
    protected void writeInternal(Map<Object, Object> map, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
        HttpHeaders headers = outputMessage.getHeaders();
        final MediaType contentType = headers.getContentType();
        Charset charset = null;
        if (contentType != null) {
            charset = contentType.getCharset();
        }
        if (charset == null) {
            charset = getDefaultCharset();
        }
        StringBuilder sb = new StringBuilder("{");
        for (Map.Entry<Object, Object> entry : map.entrySet()) {
            sb.append("\"").append(entry.getKey()).append("\":");
            Object value = entry.getValue();
            if (value instanceof String) {
                sb.append("\"").append(value).append("\"");
            }
            else {
                sb.append(value);
            }
            sb.append(",");
        }
        if (sb.length() > 1) sb.setLength(sb.length() - 1);
        sb.append("}");
        assert charset != null;
        StreamUtils.copy(sb.toString(), charset, outputMessage.getBody());
    }
}
