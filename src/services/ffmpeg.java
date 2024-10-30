import java.io.BufferedReader;
import java.io.InputStreamReader;

public class FFMpegExample {
    public static void main(String[] args) {
        try {
            String[] command = {
                "ffmpeg", 
                "-i", "input.mp4", 
                "output.gif" 
            };

            ProcessBuilder pb = new ProcessBuilder(command);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            System.out.println("Processo terminado com código: " + exitCode);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}