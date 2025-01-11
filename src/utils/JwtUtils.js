import { jwtDecode } from 'jwt-decode';

class JwtUtils {
  static decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}

export default JwtUtils;
