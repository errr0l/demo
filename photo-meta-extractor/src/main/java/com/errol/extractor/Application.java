package com.errol.extractor;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.imaging.jpeg.JpegMetadataReader;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.drew.metadata.exif.GpsDirectory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Collection;

public class Application {

    public static void main(String[] args) throws ImageProcessingException, IOException {
        String basePath = "/Users/xieshixin/personalplace/demo/photo-meta-extractor/src/main/resources/";
        //String fileName = "B6DB1B5FC9250CCA17361FA06F1792B5.jpg";
        //String fileName = "794B224FE1E5AF4B1096767603FD8C89.jpg";
        //String fileName = "383D03BD8824D1EB08DC2D9A15CB433D.jpg";
        String fileName = "1AA4A09C152DFD50994E2760A21CC1F0.jpg";

        File file = new File(basePath + fileName);
        //File file1 = new File("/Users/xieshixin/Desktop/123.png");

        System.out.println("开始读取元信息...");
        Metadata metadata = JpegMetadataReader.readMetadata(file);

        System.out.println(metadata.toString());
        OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream(basePath + fileName.split("\\.")[0] + "-meta.txt"));
        for (Directory directory : metadata.getDirectories()) {
            for (Tag tag : directory.getTags()) {
                String tagName = tag.getTagName();  //标签名
                String desc = tag.getDescription(); //标签信息
                writer.write(tagName + " ---> " + desc);
                writer.write("\n");
            }
        }

        System.out.println("开始读取经纬度信息...");
        Collection<GpsDirectory> gpsDirectories = metadata.getDirectoriesOfType(GpsDirectory.class);

        System.out.println("size: " + gpsDirectories.size());
        for(GpsDirectory gps : gpsDirectories) {
            //获取图片的经纬度信息
            GeoLocation geoLocation = gps.getGeoLocation();
            writer.write("\n");
            writer.write("Location");
            writer.write("\n");
            writer.write("Longitude --->" + geoLocation.getLongitude());
            writer.write("Latitude --->" + geoLocation.getLatitude());
        }
        System.out.println("ok.");
        writer.close();
    }
}
